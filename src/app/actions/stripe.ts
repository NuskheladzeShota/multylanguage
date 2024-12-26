"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "../config/index";
import { stripe } from "../lib/stripe";
import { createClient } from "../lib/supaBase/server"; 
const supabase = createClient();

async function getUserIdFromSupabase(): Promise<string | null> {
  try {
    const { data: { user }, error } = await (await supabase).auth.getUser();

    if (error) {
      console.error("Error fetching user from Supabase auth:", error);
      return null;
    }

    if (!user) {
      console.warn("No user logged in. Supabase auth returned null.");
      return null;
    }

    console.log("Fetched User Data from Supabase Auth:", user);
    console.log("User ID (UID):", user.id);
    console.log("User Email:", user.email);

    return user.id; 
  } catch (unexpectedError) {
    console.error("Unexpected error fetching user ID from Supabase:", unexpectedError);
    return null;
  }
}

async function insertPurchaseRecord(userId: string, checkoutId: string): Promise<void> {
  try {
    const { error } = await (await supabase)
      .from("purchaseList")
      .insert([{ user_id: userId, checkout_id: checkoutId }]);

    if (error) {
      throw new Error(`Error creating purchase record: ${error.message}`);
    }

    console.log(`Purchase record created for user ${userId} with checkout ID ${checkoutId}`);
  } catch (error) {
    console.error("Error inserting purchase record:", error);
    throw error;
  }
}

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode"
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const locale = headers().get("accept-language")?.split(",")[0] || "ka";

  console.log("Accept-Language Header:", locale);

  const description = `
    Product Name: ${data.get("name") as string}
    Description (EN): ${data.get("description") as string}
    Description (GE): ${data.get("description_ge") as string}
    Title (GE): ${data.get("title_ge") as string}
    Category: ${data.get("category") as string}
    Gender: ${data.get("gender") as string}
    Size: ${data.get("size") as string}
  `;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: data.get("name") as string,
              description: description,
            },
            unit_amount: Number(data.get("priceInCents") as string),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${locale}/success`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  const userId = await getUserIdFromSupabase();

  if (!userId) {
    throw new Error("Unauthorized: User ID not found.");
  }

  await insertPurchaseRecord(userId, checkoutSession.id);

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: Number(data.get("priceInCents") as string),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
