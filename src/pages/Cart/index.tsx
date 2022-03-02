import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const total = cart.reduce((sumTotal, { price, amount }) => {
    return sumTotal + price * amount;
  }, 0);

  function handleProductIncrement(product: Product) {
    updateProductAmount({ amount: product.amount + 1, productId: product.id });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ amount: product.amount - 1, productId: product.id });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, title, image, price, amount }) => (
            <tr data-testid="product" key={id}>
              <td>
                <img src={image} alt={title} />
              </td>
              <td>
                <strong>{title}</strong>
                <span>{formatPrice(price)}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={amount <= 1}
                    onClick={() =>
                      handleProductDecrement({
                        id,
                        title,
                        image,
                        price,
                        amount,
                      })
                    }
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() =>
                      handleProductIncrement({
                        id,
                        title,
                        image,
                        price,
                        amount,
                      })
                    }
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatPrice(price * amount)}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(total)}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
