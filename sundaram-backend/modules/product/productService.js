const Product = require('./Product');

class ProductService {
    async getProductsList(filters) {
        const { isAdmin, productFilter } = filters;

        // Fetch products and populate category
        const products = await Product.find(productFilter)
            .populate('category', 'name isActive')
            .sort({ name: 1 });

        // Filter by category status for public users
        let filteredProducts = products;
        if (!isAdmin) {
            filteredProducts = products.filter(
                (product) => product.category && product.category.isActive === true
            );
        }

        return filteredProducts;
    }

    async getProductById(id, isAdmin) {
        const filter = { _id: id };
        if (!isAdmin) {
            filter.isActive = true;
        }

        const product = await Product.findOne(filter).populate(
            'category',
            'name isActive'
        );

        if (!product) return null;

        if (!isAdmin) {
            if (!product.category || product.category.isActive !== true) {
                return null;
            }
        }

        return product;
    }

    async createNewProduct(payload) {
        return await Product.create(payload);
    }

    async updateProductById(id, payload) {
        return await Product.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        }).populate('category', 'name');
    }

    async deleteProductById(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductService();
