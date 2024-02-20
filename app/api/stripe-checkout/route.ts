import stripe from 'stripe';
import { NextResponse } from "next/server";

if (!process.env.STRIPE_API) {
  throw new Error("STRIPE_API não está definido");
}
const stripeGateway = new stripe(process.env.STRIPE_API);
const DOMAIN = process.env.BASE_URL;

export async function POST(req: Request) {
  const bodyString = await req.text();
  const bodyJSON = JSON.parse(bodyString);
  const { items } = bodyJSON;
  console.log('items:', items, bodyString);
  const lineItems = items.map((item: any) => {
    // const unitAmount = 500;
    console.log('name',item.price_data.product_data.name)

    return {
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.price_data.product_data.name,
          images: item.price_data.product_data.images,
        },
        unit_amount: item.price_data.unit_amount,
      },
      quantity: item.quantity,
    };
  });

  // Create Checkout Session
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${DOMAIN}`,
    cancel_url: `${DOMAIN}`,
    line_items: lineItems,
    billing_address_collection: 'required',
  });
  return NextResponse.json(session.url);
}
