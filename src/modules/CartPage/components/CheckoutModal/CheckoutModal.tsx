import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Cart } from '../../../../types/Cart';
import s from './CheckoutModal.module.scss';

type Props = {
  isOpen: boolean;
  cart: Cart[];
  totalPrice: number;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
};

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'demo-card' | 'cash-on-delivery';
};

const initialForm: CheckoutForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  deliveryMethod: 'standard',
  paymentMethod: 'demo-card',
};

const steps = ['Personal details', 'Delivery', 'Payment', 'Review'];

export const CheckoutModal = ({
  isOpen,
  cart,
  totalPrice,
  totalAmount,
  onConfirm,
  onCancel,
}: Props) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CheckoutForm>(initialForm);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = <K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K],
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < steps.length - 1) {
      setStep(prev => prev + 1);

      return;
    }

    onConfirm();
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const deliveryPrice = form.deliveryMethod === 'express' ? 15 : 0;
  const orderTotal = totalPrice + deliveryPrice;

  return (
    <div className={s.modalOverlay} onClick={onCancel}>
      <section
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={event => event.stopPropagation()}
      >
        <div className={s.modal__scrollArea}>
          <div className={s.modal__header}>
            <div>
              <h2 id="checkout-title" className={s.modal__title}>
                {steps[step]}
              </h2>
            </div>

            <button
              type="button"
              className={s.modal__close}
              onClick={onCancel}
              aria-label="Close checkout"
            >
              ×
            </button>
          </div>

          <div className={s.modal__progress}>
            {steps.map((label, index) => (
              <div
                key={label}
                className={`${s.modal__progressStep} ${
                  index <= step ? s['modal__progressStep--active'] : ''
                }`}
              >
                <span className={s.modal__stepNumber}>{index + 1}</span>
                <span className={s.modal__stepLabel}>{label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <div className={s.modal__fields}>
                <p className={s.modal__text}>Enter your contact information.</p>

                <label className={s.modal__field}>
                  Full name
                  <input
                    autoComplete="name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={event => updateField('name', event.target.value)}
                    placeholder="John Smith"
                  />
                </label>

                <label className={s.modal__field}>
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={event => updateField('email', event.target.value)}
                    placeholder="john@example.com"
                  />
                </label>

                <label className={s.modal__field}>
                  Phone number
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={event => updateField('phone', event.target.value)}
                    placeholder="+31 6 12345678"
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className={s.modal__fields}>
                <p className={s.modal__text}>
                  Where should we deliver your order?
                </p>

                <label className={s.modal__field}>
                  Street and house number
                  <input
                    autoComplete="street-address"
                    required
                    value={form.address}
                    onChange={event =>
                      updateField('address', event.target.value)
                    }
                    placeholder="Main Street 12"
                  />
                </label>

                <div className={s.modal__fieldRow}>
                  <label className={s.modal__field}>
                    City
                    <input
                      autoComplete="address-level2"
                      required
                      value={form.city}
                      onChange={event =>
                        updateField('city', event.target.value)
                      }
                      placeholder="Ede"
                    />
                  </label>

                  <label className={s.modal__field}>
                    Postal code
                    <input
                      autoComplete="postal-code"
                      required
                      value={form.postalCode}
                      onChange={event =>
                        updateField('postalCode', event.target.value)
                      }
                      placeholder="6711 AB"
                    />
                  </label>
                </div>

                <p className={s.modal__label}>Delivery method</p>

                <label className={s.modal__option}>
                  {}
                  <input
                    type="radio"
                    name="delivery"
                    checked={form.deliveryMethod === 'standard'}
                    onChange={() => updateField('deliveryMethod', 'standard')}
                  />
                  <span>
                    <strong>Standard delivery</strong>
                    <small>3–5 business days · Free</small>
                  </span>
                </label>

                <label className={s.modal__option}>
                  {}
                  <input
                    type="radio"
                    name="delivery"
                    checked={form.deliveryMethod === 'express'}
                    onChange={() => updateField('deliveryMethod', 'express')}
                  />
                  <span>
                    <strong>Express delivery</strong>
                    <small>1–2 business days · $15</small>
                  </span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className={s.modal__fields}>
                <p className={s.modal__text}>
                  Choose a payment method for this demo. No real payment will be
                  processed.
                </p>

                <label className={s.modal__option}>
                  {}
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === 'demo-card'}
                    onChange={() => updateField('paymentMethod', 'demo-card')}
                  />
                  <span>
                    <strong>Card payment</strong>
                    <small>Simulated payment — no card details required</small>
                  </span>
                </label>

                <label className={s.modal__option}>
                  {}
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === 'cash-on-delivery'}
                    onChange={() =>
                      updateField('paymentMethod', 'cash-on-delivery')
                    }
                  />
                  <span>
                    <strong>Cash on delivery</strong>
                    <small>Payment is not collected by this application</small>
                  </span>
                </label>

                <div className={s.modal__notice}>
                  <strong>Checkout</strong>
                  <p>
                    This is a portfolio project. Selecting a payment method does
                    not charge you or initiate a transaction.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={s.modal__fields}>
                <p className={s.modal__text}>
                  Check your details and order total before confirming.
                </p>

                <div className={s.modal__reviewSection}>
                  <h3>Contact details</h3>
                  <p>{form.name}</p>
                  <p>{form.email}</p>
                  <p>{form.phone}</p>
                </div>

                <div className={s.modal__reviewSection}>
                  <h3>Delivery</h3>
                  <p>{form.address}</p>
                  <p>
                    {form.city}, {form.postalCode}
                  </p>
                  <p>
                    {form.deliveryMethod === 'express'
                      ? 'Express delivery · $15'
                      : 'Standard delivery · Free'}
                  </p>
                </div>

                <div className={s.modal__reviewSection}>
                  <h3>Payment</h3>
                  <p>
                    {form.paymentMethod === 'demo-card'
                      ? 'Card payment'
                      : 'Cash on delivery'}
                  </p>
                </div>

                <div className={s.modal__reviewSection}>
                  <h3>Order items ({totalAmount})</h3>

                  {cart.map(item => (
                    <div className={s.modal__orderItem} key={item.id}>
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <strong>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className={s.modal__total}>
                  <span>Products</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className={s.modal__total}>
                  <span>Delivery</span>
                  <span>${deliveryPrice.toFixed(2)}</span>
                </div>

                <div className={s.modal__grandTotal}>
                  <span>Total</span>
                  <strong>${orderTotal.toFixed(2)}</strong>
                </div>
              </div>
            )}

            <div className={s.modal__actions}>
              <button
                type="button"
                className={`${s.modal__button} ${s.modal__buttonCancel}`}
                onClick={step === 0 ? onCancel : handleBack}
              >
                {step === 0 ? 'Cancel' : 'Back'}
              </button>

              <button
                type="submit"
                className={`${s.modal__button} ${s.modal__buttonConfirm}`}
              >
                {step === steps.length - 1 ? 'Place order' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
