import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { productType } from "../../interfaceModule";
import { useMyContext } from "../../module/MyContext.tsx";
type TotalCartProps = {
  total: number;
  cart: productType[];
  randomNum: number;
  buyitem: () => productType[];
  totalConnect: (value: number) => void;
  checkLists: number[];
};

const TotalCart = ({
  total,
  cart,
  randomNum,
  buyitem,
  totalConnect,
  checkLists,
}: TotalCartProps) => {
  const [initialPrice, setInitial] = useState(0);
  const delivery = 3000;
  const { price } = useMyContext();

  useEffect(() => {
    if (buyitem().length > 0) {
      const sum = buyitem().map((item) => item.price * item.quantity);
      const itemTotal = sum.reduce((acc, cur) => acc + cur);
      if (itemTotal <= 0) {
        totalConnect(0);
      } else {
        setInitial(itemTotal);

        if (randomNum > 0) {
          const discount =
            itemTotal - Math.round(itemTotal * (randomNum / 100));
          if (discount > delivery * 10) {
            totalConnect(discount);
          } else {
            totalConnect(discount + delivery);
          }
        } else {
          if (itemTotal > delivery * 10) {
            totalConnect(itemTotal);
          } else {
            totalConnect(itemTotal + delivery);
          }
        }
      }
    } else {
      totalConnect(0);
      setInitial(0);
    }
  }, [buyitem, checkLists, cart, total, totalConnect, randomNum]);

  return (
    <div className="totals">
      <div className="total_price">
        <p className="cart_product_total_price">총 상품금액</p>
        <p className="cart_product_price">
          {isNaN(parseInt(price(initialPrice))) ? "" : price(initialPrice)}
        </p>
      </div>
      <div className="pay_minus">
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className="sale">
        <p className="cart_product_sale">상품 할인</p>
        <p className="cart_product_sale_price">{randomNum}%</p>
      </div>
      <div className="pay_plus">
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className="delivery">
        <p className="cart_product_delivery">배송비</p>
        <p className="cart_product_delivery_price">
          {total > delivery * 10 ? 0 : delivery}
        </p>
      </div>

      <div className="payment">
        <p className="cart_prouct_payment">결제 예정 금액</p>
        <p className="cart_prouct_payment_price">
          {isNaN(parseInt(price(total)))
            ? ""
            : price(Math.round(total / 10) * 10)}
        </p>
      </div>
    </div>
  );
};

export default TotalCart;
