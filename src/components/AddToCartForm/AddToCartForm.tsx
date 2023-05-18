import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { CartItemType } from '@/reducers/cart/cartSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import classes from './AddToCartForm.module.css';

const validationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be an integer' })
    .min(1, 'Quantity must be greater than or equal to 1'),
  price: z
    .number({ invalid_type_error: 'Price must be an integer' })
    .min(0.01, 'Price must be greater than or equal to 0.01'),
});

type FormValues = Omit<CartItemType, 'id'>;

type Props = {
  addToCart: (item: CartItemType) => void;
  isLoading: boolean;
};

const AddToCartForm: React.FC<Props> = React.memo((props) => {
  const { addToCart, isLoading } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(({ name, quantity, price }) => {
    const item: CartItemType = {
      id: nanoid(),
      name,
      quantity,
      price,
    };
    addToCart(item);
    reset();
  });

  return (
    <form className={classes['form']} onSubmit={onSubmit}>
      <h2 className={classes['form__title']}>Add New Item</h2>
      <InputField
        {...register('name')}
        error={errors.name?.message}
        title="Name"
      />
      <InputField
        {...register('quantity', { valueAsNumber: true })}
        error={errors.quantity?.message}
        title="Quantity"
        type="number"
        step={1}
      />
      <InputField
        {...register('price', { valueAsNumber: true })}
        error={errors.price?.message}
        title="Price"
        type="number"
        step={0.01}
      />
      <Button className={classes['form__submit']} disabled={isLoading}>
        Add To Cart
      </Button>
    </form>
  );
});

export default AddToCartForm;
