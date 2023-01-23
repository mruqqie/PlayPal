const resWithData = (res, statusCode, data) => {
    res.status(statusCode).json(data)
};

const error = (res) => {
    resWithData(res, 500, {
        status: 500,
        message: "Oops! Something went wrong!"
    })
};

const badReq = (res, message) => {
    resWithData(res, 400, {
        status: 400,
        message
    })
};

const ok = (res, data) => {
    resWithData(res, 200, data)
};

const created =(res, data) => {
    resWithData(res, 201, data)
};

const unauthorized = (res) => {
    resWithData(res, 401, {
        status: 401,
        message: "Unauthorized"
    })
};

const notFound = (res) => {
    resWithData(res, 404, {
        status: 404,
        message: "Resource not Found"
    })
};

export default {
    error,
    badReq,
    ok,
    created,
    unauthorized,
    notFound
};