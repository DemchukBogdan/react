import React from "react";
import Shipment from "./Shipment";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrder = (key) => {
    const burger = this.props.burgers[key];
    const count = this.props.order[key];

    const isAvailable = burger && burger.status === "available";
    if (!burger) return null;
    if (!isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 5000, exit: 5000 }}
        >
          <li className="unavailable" key={key}>
            {burger ? burger.name : "бургер"} нажаль не доступний
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 5000, exit: 5000 }}
      >
        <li key={key}>
          <span>
            <span>{count}</span>
            шт. {burger.name}
            <span>
              {count * burger.price} ₴
              <button
                onClick={() => this.props.deleteFromOrder(key)}
                className="cancleItem"
              >
                &times;
              </button>
            </span>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const burger = this.props.burgers[key];
      const count = this.props.order[key];

      const isAvailable = burger && burger.status === "available";

      if (isAvailable) {
        return prevTotal + burger.price * count;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Ваше замовлення</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>

        {total > 0 ? (
          <Shipment total={total} />
        ) : (
          <div className="nothingSelected">
            Виберіть страву і додайте до замовлення
          </div>
        )}
      </div>
    );
  }
}

export default Order;
