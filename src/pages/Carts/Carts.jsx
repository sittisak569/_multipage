import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Carts.css";

function Carts({ carts, setCarts }) {
  return (
    <div className="carts-container">
      <div className="carts-items-container">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => 
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4 className="box4h">
        <b>Items: {carts.length} items - total Price: $
        {carts.reduce((prev, cart) => {
          return prev + cart.price
        }, 0) .toFixed(2)}</b>
      </h4>
      <div className="Checkout">
      <button className="badge text-bg-warning">Checkout&nbsp; <span className="bi bi-cash-coin"></span></button>
      </div>
    </div>
  );
}

export default Carts;
