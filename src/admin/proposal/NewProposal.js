import React, { useState } from 'react'

const ProposalTemplate = () => {
    const [products, setProducts] = useState([{ productId: '', quantity: 1, discount: 0, total: 0, currency: 'USD' }]);
  return (
    <div className="container">
      <h2>Add Proposal</h2>
      <form>
        <div className="form-group">
          <label htmlFor="emailTo">Email To</label>
          <input
            type="email"
            className="form-control"
            id="emailTo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            required
          ></textarea>
        </div>
        <h4>Products</h4>
        {products.map((product, index) => (
          <div key={index} className="product-row">
            <div className="form-group">
              <label htmlFor={`productId_${index}`}>Product ID</label>
              <input
                type="text"
                className="form-control"
                id={`productId_${index}`}
                value={product.productId}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`quantity_${index}`}>Quantity</label>
              <input
                type="number"
                className="form-control"
                id={`quantity_${index}`}
                value={product.quantity}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`discount_${index}`}>Discount</label>
              <input
                type="number"
                className="form-control"
                id={`discount_${index}`}
                value={product.discount}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`currency_${index}`}>Currency</label>
              <input
                type="text"
                className="form-control"
                id={`currency_${index}`}
                value={product.currency}
                required
              />
            </div>
            <button type="button" className="btn btn-danger" >Remove Product</button>
          </div>
        ))}
        <button type="button" className="btn btn-primary">Add Another Product</button>
        <div className="form-group mt-4">
          <label htmlFor="discountOnGrandTotal">Discount on Grand Total</label>
          <input
            type="number"
            className="form-control"
            id="discountOnGrandTotal"
            min="0"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">Submit Proposal</button>
        </div>
      </form>
    </div>
  );
}

export default ProposalTemplate
