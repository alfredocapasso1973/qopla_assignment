const CartButton: React.FC = () => {
    return (
        <button className="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="bi bi-cart"></i>
            <b> Show Cart </b>
        </button>
    );
};

export default CartButton;
