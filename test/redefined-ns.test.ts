import test from "tape";
import { existsSync } from "fs";
import { parseAndGenerate } from "../src";
import { Logger } from "../src/utils/logger";

test("redefined-ns", async t => {
    Logger.disabled();

    const input = "./test/resources/redefined-ns.wsdl";
    const outdir = "./test/generated";

    t.test("generate wsdl client", async t => {
        await parseAndGenerate(input, outdir);
        t.end();
    });

    t.test("check definitions", async t => {
        t.equal(existsSync(`${outdir}/redefinedns/definitions/VerificationData.ts`), true);
        t.equal(existsSync(`${outdir}/redefinedns/definitions/VerificationRequest.ts`), true);
        t.equal(existsSync(`${outdir}/redefinedns/definitions/Verify.ts`), true);
        t.equal(existsSync(`${outdir}/redefinedns/definitions/VerifyResponse.ts`), true);
        t.equal(existsSync(`${outdir}/redefinedns/definitions/VerifyResult.ts`), true);
        t.end();
    });
});