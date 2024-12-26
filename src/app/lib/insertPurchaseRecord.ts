import { createClient } from "./supaBase/server";

const supabase = createClient();

export async function insertPurchaseRecord(userId: string, checkoutId: string): Promise<void> {
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
