"use client";

import { useState } from "react";

export default function AddToCartButton({
    product,
}) {
    const [added, setAdded] =
        useState(false);

    const handleAddToCart = () => {
        if (!product?._id) {
            return;
        }

        try {
            const existingCart =
                JSON.parse(
                    localStorage.getItem(
                        "cart"
                    ) || "[]"
                );

            const existingProduct =
                existingCart.find(
                    (item) =>
                        item._id ===
                        product._id
                );

            let updatedCart;

            if (existingProduct) {
                updatedCart =
                    existingCart.map(
                        (item) =>
                            item._id ===
                            product._id
                                ? {
                                      ...item,
                                      quantity:
                                          (item.quantity ||
                                              1) + 1,
                                  }
                                : item
                    );
            } else {
                updatedCart = [
                    ...existingCart,
                    {
                        ...product,
                        quantity: 1,
                    },
                ];
            }

            localStorage.setItem(
                "cart",
                JSON.stringify(
                    updatedCart
                )
            );

            /*
             * Cart components can listen
             * for this event later.
             */
            window.dispatchEvent(
                new Event("cartUpdated")
            );

            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1500);

        } catch (error) {
            console.error(
                "Add to cart error:",
                error
            );
        }
    };

    return (
        <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product?.name || "product"} to cart`}
            className="
                w-full
                rounded-xl
                border
                border-[#9a6845]
                bg-[#9a6845]
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#7f5438]
                focus:outline-none
                focus:ring-2
                focus:ring-[#9a6845]
                focus:ring-offset-2
            "
        >
            {added
                ? "Added to Cart ✓"
                : "Add to Cart"}
        </button>
    );
}