import { reactExtension, Checkbox, Text, useCartLineTarget, useApplyCartLinesChange, useShippingAddress } from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';
import { CartLineItemApi } from '@shopify/ui-extensions/checkout';

export default reactExtension('purchase.checkout.cart-line-item.render-after', () => (
  <Extension />
));

const Extension = () => {
  // const [discount, setDiscount] = useState<string | number>('');
  const applyCartLinesChange = useApplyCartLinesChange();
  const {
    id
  } = useCartLineTarget();
  const address = useShippingAddress();

  useEffect(() => {
    const discount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
    console.log('discount', discount);
    applyCartLinesChange({
      type: 'updateCartLine',
      id,
      attributes: [{ key: 'discount', value: `${discount}` }]
    }).then(res => console.log(res));
  }, [JSON.stringify(address)]);

  // const updateCartLineItemAttribute = async () => {
  //   const discount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
  //   console.log('discount', discount);
  //   const result = await applyCartLinesChange({
  //     type: 'updateCartLine',
  //     id,
  //     attributes: [{ key: 'discount', value: `${discount}` }]
  //   });
  //   return result;
  // }

  return (
    <Text>Hello world</Text>
  );
};
