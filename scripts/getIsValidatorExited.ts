import axios from "axios";
import {logger} from "./helpers/logger";

export async function getIsValidatorExited(pubkey: string) {
    logger.info('getIsValidatorExited started for ' + pubkey)

    if (!process.env.BEACON_URL) {
        throw new Error("No BEACON_URL in ENV")
    }

    const result = await axios.get(
        process.env.BEACON_URL! +
        '/eth/v1/beacon/states/head/validators/' +
        pubkey
    )

    const isExited = result.data.data.status === 'withdrawal_done'

    logger.info('getIsValidatorExited finished for ' + pubkey + ' ' + isExited)
    return isExited
}

