// deno-lint-ignore-file no-explicit-any
import { Product } from "../typesinterface.ts";
import db from "../mongodb.ts";
import { Bson } from "https://deno.land/x/mongo/mod.ts";

/**
 * Pobranie bazy danych produktów
 */
const productCollection = db.collection<Product>("products");

//@ GET /api/products
/**
 * pobranie produktów z bazy danych
 * @param response - odpowiedź serwera podczas wywołania metody
 */
export const getProducts = async ({ response }: { response: any }) => {
    const p: Product[] = await productCollection.find({}).toArray();
    response.body = {
        success: true,
        data: p,
    };
};
//@ GET /api/product/:id
/**
 * Pobranie pojedynczego produktu z bazy po ID
 * @param {id: string} params - ID produktu
 * @param response - odpowiedź serwera podczas wywołania metody
 */
export const getSingleProduct = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    const product = await productCollection.findOne({
        _id: new Bson.ObjectId(params.id),
    });
    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product,
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "No product found",
        };
    }
};

// @ POST /api/product/
/**
 * Dodanie produktu do bazy danych
 * @param request - zapytanie do serwera
 * @param response - odpowiedź serwera podczas wywołania metody
 */
export const addProduct = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    const body = await request.body();
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            succes: false,
            msg: "No data",
        };
    } else {
        const product: Product = await body.value;
        productCollection.insertOne(product);
        response.status = 201;
        response.body = {
            succes: true,
            data: product,
        };
    }
};

//@ PATCH /api/product/:id
/**
 * Edycja parametrów produktu
 * @param {id: string} params - ID produktu
 * @param request - zapytanie do serwera
 * @param response - odpowiedź serwera podczas wywołania metody
 */
export const updateProduct = async ({
    params,
    request,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    const body = await request.body();
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            succes: false,
            msg: "No data",
        };
    } else {
        const product: Product = await body.value;
        console.log(product);
        const updated = await productCollection.updateOne(
            { _id: new Bson.ObjectId(params.id) },
            {
                $set: product,
            }
        );
        if (!updated.matchedCount) {
            response.status = 404;
            response.body = {
                succes: false,
                msg: "Wrong Id",
            };
        } else {
            response.status = 200;
            response.body = {
                succes: true,
                data: await productCollection.findOne({
                    _id: new Bson.ObjectId(params.id),
                }),
            };
        }
    }
};

//@ DELETE /api/product/:id
/**
 * Usunięcie produktu o podanym ID
 * @param {id: string} params - ID produktu
 * @param response - odpowiedź serwera podczas wywołania metody
 */
export const deleteProduct = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    const deleted = await productCollection.deleteOne({
        _id: new Bson.ObjectId(params.id),
    });
    if (!deleted) {
        response.status = 404;
        response.body = {
            success: "false",
            msg: "Not found",
        };
    } else {
        response.status = 204;
    }
};
