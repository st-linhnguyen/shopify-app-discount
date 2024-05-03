// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The configured entrypoint for the 'purchase.delivery-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const discountPercent = Math.floor(Math.random() * 100);
  const selectedDelivery = input.cart.deliveryGroups[0].selectedDeliveryOption;
  console.error(JSON.stringify(selectedDelivery));

  // const standardMoney = 5000;
  // const numberOfProduct = input.cart.lines.length;
  // const expectShippingCost = standardMoney * numberOfProduct;

  // const deliveryOptions = input.cart.deliveryGroups[0].deliveryOptions;
  // const discountAmount = parseFloat(selectedDelivery.cost.amount) * discountPercent / 100;

  // const hidedShippingMethods = deliveryOptions.filter(deliveryOption => deliveryOption.cost.amount !== `${expectShippingCost}.0`);
  // const operationResult = hidedShippingMethods.map(item => {
  //   return {
  //     hide: {
  //       deliveryOptionHandle: item.handle
  //     }
  //   }
  // });
  // console.error(JSON.stringify(operationResult));

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    discounts: [{
      message: 'Shipping discounted',
      targets: [{
        deliveryOption: {
          handle: selectedDelivery.handle
        }
      }],
      value: {
        percentage: {
          value: discountPercent
        }
      }
    }]
  };
};
