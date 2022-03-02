import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { ProductList } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, { id, amount }) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[id] = amount;

    return newSumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      await api.get<Product[]>("products").then(({ data }) => setProducts(data));
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map(({ id, image, price, title }) => (
        <li key={id}>
          <img src={image} alt={title} />
          <strong>{title}</strong>
          <span>{formatPrice(price)}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
