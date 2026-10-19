import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import { capitalizeFirstLetter } from '../../utils/string';
import { Back } from '../shared/Back';
import s from './CartPage.module.scss';
import { Line } from '../shared/Line';
import { PrimaryButton } from '../shared/PrimaryButton';
import { CartItem } from './components/CartItem/CartItem';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';

export const CartPage = () => {
  const { pathname } = useLocation();

  const { cart, setCart } = useContext(CartContext) || {
    cart: [],
    setCart: () => {},
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const type = pathname.slice(1);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsOrderCompleted(false);
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    setCart([]);
    setIsModalOpen(false);
    setIsOrderCompleted(true);
  };

  const handleCancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.cart}>
      <Back to="/" />

      {isOrderCompleted && (
        <div className={s.cart__success} role="status">
          <h2>Order placed successfully!</h2>
          <p>
            Thank you for your order. This was a demo checkout, so no payment
            was processed.
          </p>
        </div>
      )}

      {cart.length > 0 ? (
        <>
          <h1 className={s.cart__title}>{capitalizeFirstLetter(type)}</h1>

          <div className={s.cart__content}>
            <div className={s.cart__list}>
              {cart.map(item => (
                <CartItem key={item.product.id} cartItem={item} />
              ))}
            </div>

            <div className={s.cart__total}>
              <div className={s.cart__totalContent}>
                <div className={s.cart__totalPriceAmount}>
                  <div className={s.cart__totalPrice}>
                    ${totalPrice.toFixed(2)}
                  </div>

                  <div className={s.cart__totalAmount}>
                    Total for {totalAmount} items
                  </div>
                </div>

                <Line />

                <div className={s.cart__totalButton}>
                  <PrimaryButton onClick={handleCheckout}>
                    Checkout
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>

          <CheckoutModal
            isOpen={isModalOpen}
            cart={cart}
            totalPrice={totalPrice}
            totalAmount={totalAmount}
            onConfirm={handleConfirmCheckout}
            onCancel={handleCancelCheckout}
          />
        </>
      ) : (
        !isOrderCompleted && (
          <img
            src="./img/cart-is-empty.png"
            className={s.cart__isEmpty}
            alt="Cart is empty"
          />
        )
      )}
    </div>
  );
};
