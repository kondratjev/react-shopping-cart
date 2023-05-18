import AddToCartForm from '@/components/AddToCartForm';
import Layout from '@/components/Layout/Layout';
import CartItems from '@/components/ShoppingCart';
import { cartSelector, subtotalSelector } from '@/reducers/cart/cartSelectors';
import {
  CartItemType,
  addQuantity,
  addToCart,
  changeQuantity,
  fetchCart,
  removeFromCart,
  subtractQuantity,
} from '@/reducers/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useCallback, useEffect } from 'react';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const subtotal = useAppSelector(subtotalSelector);
  const { items, isLoading, error } = useAppSelector(cartSelector);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddQuantity = useCallback(
    (id: string) => {
      dispatch(addQuantity(id));
    },
    [dispatch],
  );

  const handleSubtractQuantity = useCallback(
    (id: string) => {
      dispatch(subtractQuantity(id));
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  const handleChangeQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch],
  );

  const handleAddToCart = useCallback(
    (item: CartItemType) => {
      dispatch(addToCart(item));
    },
    [dispatch],
  );

  const renderForm = useCallback(() => {
    return <AddToCartForm addToCart={handleAddToCart} isLoading={isLoading} />;
  }, [handleAddToCart, isLoading]);

  return (
    <Layout renderForm={renderForm}>
      <CartItems
        items={items}
        isLoading={isLoading}
        error={error}
        subtotal={subtotal}
        addQuantity={handleAddQuantity}
        subtractQuantity={handleSubtractQuantity}
        removeFromCart={handleRemoveFromCart}
        changeQuantity={handleChangeQuantity}
      />
    </Layout>
  );
};

export default App;
