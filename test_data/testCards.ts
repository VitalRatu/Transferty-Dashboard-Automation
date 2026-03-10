export type CardData = 
{
  project?: string;
  amount: string;
  currency: string;
  transaction_type: string;
  card_number: string;
  card_expiry?: string;
  card_cvc?: string;
  description?: string;
};

export const testCards = [
  {
    amount: "1",
    currency: "USD",
    transaction_type: "Payment",
    card_number: "4012888888881881",
    card_expiry: "10 / 27",
    card_cvc: "000",
    description: "Payment Visa from automation"
  },

  {
    amount: "1",
    currency: "USD",
    transaction_type: "Payout",
    card_number: "4012888888881881",
    description: "Payout Visa from automation"
  },

  {
    amount: "2",
    currency: "USD",
    transaction_type: "Payment",
    card_number: "5413330300003002",
    card_expiry: "04 / 28",
    card_cvc: "440",
    description: "Payment MasterCard from automation"
  },

  {
    amount: "2",
    currency: "USD",
    transaction_type: "Payout",
    card_number: "5413330300003002",
    description: "Payout MasterCard from automation"
  },

  {
    amount: "3",
    currency: "USD",
    transaction_type: "Payment",
    card_number: "5555555555554444",
    card_expiry: "12 / 27",
    card_cvc: "111",
    description: "Payment MasterCard 2 from automation"
  },

  {
    amount: "3",
    currency: "USD",
    transaction_type: "Payout",
    card_number: "5555555555554444",
    description: "Payout MasterCard 2 from automation"
  },

   {
    amount: "4",
    currency: "USD",
    transaction_type: "Payment",
    card_number: "371449635398431",
    card_expiry: "01 / 28",
    card_cvc: "0203",
    description: "Payment Amex 2 from automation"
  },

  {
    amount: "4",
    currency: "USD",
    transaction_type: "Payout",
    card_number: "371449635398431",
    description: "Payout Amex 2 from automation"
  },

  {
    amount: "5",
    currency: "USD",
    transaction_type: "Payment",
    card_number: "6212345678901232",
    card_expiry: "02 / 28",
    card_cvc: "092",
    description: "Payment Unionpay from automation"
  },

  {
    amount: "5",
    currency: "USD",
    transaction_type: "Payout",
    card_number: "6212345678901232",
    description: "Payout Unionpay from automation"
  },
];