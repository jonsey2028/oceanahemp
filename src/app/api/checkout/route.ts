import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "misterjones.kj@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

interface CheckoutItem {
  title: string;
  variant: string;
  quantity: number;
  price: number;
  subscription: boolean;
  image?: string;
}

interface CheckoutBody {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    notes?: string;
  };
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { customer, items, subtotal, shipping, total } = body;

    if (!customer.email || !customer.firstName || !customer.lastName) {
      return NextResponse.json({ error: "Missing required customer info" }, { status: 400 });
    }

    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    const date = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

    const itemsHtml = items
      .map(
        (item) => `<tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">
            ${item.image ? `<img src="https://oceanahemp.com${item.image}" alt="${item.title}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;" />` : ""}
          </td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">
            <strong>${item.title}</strong><br/>
            <span style="color:#6b7280;font-size:13px;">${item.variant}</span>
            ${item.subscription ? `<br/><span style="color:#10b981;font-size:12px;font-weight:600;">SUBSCRIPTION</span>` : ""}
          </td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">$${item.price.toFixed(2)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;"><strong>$${(item.quantity * item.price).toFixed(2)}</strong></td>
        </tr>
        `
      )
      .join("");

    const emailHtml = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a4a6e;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🌊 OceanaHemp Order Reservation</h1>
      </div>
      <div style="padding:24px;background:#fff;">
        <p style="color:#374151;">
          <strong>${customer.firstName} ${customer.lastName}</strong> has placed an order reservation.
        </p>
        <p style="color:#6b7280;font-size:13px;">Order ID: <strong>${orderId}</strong> | Date: ${date} PT</p>

        <h2 style="color:#0a4a6e;font-size:16px;margin-top:24px;">Customer Info</h2>
        <p style="color:#374151;font-size:14px;">
          <strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a><br/>
          ${customer.phone ? `<strong>Phone:</strong> <a href="tel:${customer.phone}">${customer.phone}</a><br/>` : ""}
          <strong>Address:</strong> ${customer.address1}${customer.address2 ? `, ${customer.address2}` : ""}, ${customer.city}, ${customer.state} ${customer.zip}, ${customer.country}<br/>
          ${customer.notes ? `<strong>Notes:</strong> ${customer.notes}<br/>` : ""}
        </p>

        <h2 style="color:#0a4a6e;font-size:16px;margin-top:24px;">Items</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="color:#6b7280;font-size:12px;text-transform:uppercase;">
              <th style="text-align:left;padding:8px;border-bottom:2px solid #e5e7eb;"></th>
              <th style="text-align:left;padding:8px;border-bottom:2px solid #e5e7eb;">Product</th>
              <th style="text-align:center;padding:8px;border-bottom:2px solid #e5e7eb;">Qty</th>
              <th style="text-align:right;padding:8px;border-bottom:2px solid #e5e7eb;">Price</th>
              <th style="text-align:right;padding:8px;border-bottom:2px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;">
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#6b7280;">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#6b7280;margin-top:4px;">
            <span>Shipping</span>
            <span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:700;color:#0a4a6e;margin-top:8px;border-top:2px solid #e5e7eb;padding-top:8px;">
            <span>TOTAL</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>

        <p style="margin-top:24px;color:#6b7280;font-size:13px;">
          Reply to this email or call (858) 365-8439 to coordinate payment and shipping.
        </p>
      </div>
      <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
        🌊 OceanaHemp · Encinitas, CA 92024 · hello@oceanahemp.com
      </div>
    </div>
    `;

    const subject = `🌊 New Order ${orderId} — $${total.toFixed(2)} from ${customer.firstName} ${customer.lastName}`;

    // Send email via Resend
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "OceanaHemp Orders <orders@oceanahemp.com>",
          to: ADMIN_EMAIL,
          subject,
          html: emailHtml,
          reply_to: customer.email,
        }),
      });
    }

    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
