const Product = require("../modules/product.module")

const createProduct = async (req, res) => {
    let { name, measure, massa, price, code } = req.body
    console.log({ name, measure, massa, price, code });
    if (!name || !measure || !massa || !price || !code) {
        res.status(400).send({ msg: "All Fields Required" })

        return
    }

    try {

        let ProductCreaste = await Product.create({ name, measure, massa, price, code })

        res.status(200).send({ success: true, msg: "Product successfully created" })

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {

            res.status(400).send({ success: false, msg: "This organization is allredy exist" })

            return
        }

        res.status(500).send({ success: false, msg: "Eternal server error" })
    }

}

const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find();

        return res.status(200).send({ success: true, products });

    } catch (error) {

        console.error("Error fetching products:", error);

        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

const getProductById = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await Product.findById(id);

        if (!product) {

            return res.status(404).send({ success: false, msg: "Product not found" });

        }

        return res.status(200).send({ success: true, product });

    } catch (error) {

        console.error("Error fetching product:", error);

        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

const updateProductById = async (req, res) => {
    const { id } = req.params;

    const { name, measure, massa, price, code } = req.body;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(

            id,

            { name, measure, massa, price, code },

            { new: true }
        );

        if (!updatedProduct) {

            return res.status(404).send({ success: false, msg: "Product not found" });
        }

        return res.status(200).send({ success: true, product: updatedProduct, msg: "Product updated successfully" });

    } catch (error) {

        console.error("Error updating product:", error);

        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

const deleteProductById = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {

            return res.status(404).send({ success: false, msg: "Product not found" });

        }

        return res.status(200).send({ success: true, msg: "Product deleted successfully" });

    } catch (error) {

        console.error("Error deleting product:", error);

        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}