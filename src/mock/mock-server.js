import Mock from "mockjs";
import mocks from "./index.js";

export function setupMockServer() {
    mocks.forEach(e => {
        Mock.mock( e.url, e.method, e.response )
    })
}