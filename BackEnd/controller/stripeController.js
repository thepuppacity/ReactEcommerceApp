import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePaymentController = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe expects the price in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paymentCompleteController = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
      { expand: ["payment_intent.payment_method"] }
    );
    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.query.session_id
    );

    console.log(JSON.stringify({ session, lineItems }, null, 4));
    res.send("<h1>Your Payment is successful</h1>");
  } catch (error) {
    console.error("Error retrieving session:", error.message);
    res.status(500).json({
      error: "An error occurred while retrieving the payment session.",
    });
  }
};

export const paymentCancelController = (req, res) => {
  res.redirect("/");
};
