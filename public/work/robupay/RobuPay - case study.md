# RobuPay: Designing a Crypto Payment Platform for Merchants, Buyers and Admins

## At a glance

RobuPay lets webshops accept cryptocurrency instead of Visa or Mastercard. I designed the product across three roles (merchant, buyer and admin), plus the marketing site and the mobile layouts.

|  |  |
| --- | --- |
| Product | RobuPay, crypto payment gateway for webshops (web, responsive) |
| Industry | Fintech / blockchain (Roburna) |
| My role | UI/UX Designer&#32; |
| Scope | Marketing website, sign-up and login, 2FA, buyer checkout, merchant dashboard, admin dashboard, mobile layouts |
| Timeline | &#32;Feb 2025 |

&#91;image: Recording 2026-11-04 105504.gif\]

## The problem

A crypto payment is less forgiving than a card payment. The buyer has to send the exact amount, in the right coin, to the right address, within a time limit, and a mistake can't be reversed. A merchant has to trust a product they can't easily verify, and the platform has to let admins approve merchants, approve new coins, set fees and handle disputes.

The PM's document set out three users and the screens each needed. The design question was how to make a high-stakes, unfamiliar payment feel clear and trustworthy for all three, without three separate-looking products.

## My role

I turned the PM's requirements into flows and screens for all three roles. I did not set the product requirements; they came from the PM's document. \[Add: what you decided on your own, e.g. layout, hierarchy, the checkout steps.\]

## Design

### 1. Put the rules of a crypto payment in front of the buyer, in the checkout itself

Buyers pay inside the webshop's own checkout, with RobuPay as a payment option beside card. A four-step tracker (Shopping, Billing, Payment, Confirmation) shows where they are. They pick a coin from cards that show the amount owed in each (for example BNB, USDT and BUSD on BSC). The payment screen then states the rules before asking for money: send the full amount as one transaction, and the order is cancelled if the coins don't arrive within three hours. The amount, the address and a QR code sit together, with a copy button. A confirmation screen closes the loop with order number, coin and processing time.

&#91;image: image.png\]

### 2. Give merchants one place to see money and manage coins

The merchant dashboard opens on four headline figures, the latest payments and a revenue chart. Wallet management is a separate screen: accepted coins in a table, wallet address submission, and an "Add a coin" request form for new tokens. Transaction history can be filtered by date, status and amount, with CSV export, and invoices can be generated and downloaded. Payment status is a colour-coded tag (pending, paid, cancelled), so a merchant can scan a long list quickly.

&#91;image: Recording 2026-11-04 105847.gif\]

### 3. Give admins controls that match the risks

The admin side covers merchant approval, crypto requests (requested versus supported coins), fee settings and transaction monitoring. Fees are adjusted with sliders that show the current value, one for the transaction fee and one for the 50% discount the brief called for. Disputes are summarised in a single donut (resolved, rejected, pending), and a transaction's detail view gives the admin Reject, Approve and Flag actions in one place.

&#91;image: image.png\]

## Final solution

The same sidebar, green palette and table pattern run through the merchant and admin dashboards, so the three roles read as one product. Merchant and admin dashboards also have mobile layouts with a bottom navigation bar, and the marketing site is designed for both desktop and mobile.

## 
