
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../../services/orders';
import { InterItem } from '../../utils/Interfaces';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const createPayment = async (req: Request, res: Response) => {
  const data = req.body;
  const { user_id } = req.body.user;

  try {
    
    const session = await getSession(data, req);
    
    // add order
    if(session.id) {
      OrderService.create(data, user_id);
    }

    res.status(200).json({ id: session.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

}

async function getSession(data: any, req: Request) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    line_items: data.items.map((item: InterItem) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.productId,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${req.headers.origin}/orders`,
    cancel_url: `${req.headers.origin}/checkout`,
  });
}

