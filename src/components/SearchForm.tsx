const SearchForm: React.FC = () => {
    return (
        <form className="form-control border-0">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control p-0"
                    placeholder="Sök efter produkter.."
                    aria-label="Sök efter produkter.."
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Rensa</button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;