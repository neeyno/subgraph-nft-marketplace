import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ERC1155ItemBought } from "../generated/schema"
import { ERC1155ItemBought as ERC1155ItemBoughtEvent } from "../generated/ERC1155Marketplace/ERC1155Marketplace"
import { handleERC1155ItemBought } from "../src/erc-1155-marketplace"
import { createERC1155ItemBoughtEvent } from "./erc-1155-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let buyer = Address.fromString("0x0000000000000000000000000000000000000001")
    let nftContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let quantity = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let returnData = Bytes.fromI32(1234567890)
    let newERC1155ItemBoughtEvent = createERC1155ItemBoughtEvent(
      buyer,
      nftContract,
      tokenId,
      quantity,
      price,
      returnData
    )
    handleERC1155ItemBought(newERC1155ItemBoughtEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ERC1155ItemBought created and stored", () => {
    assert.entityCount("ERC1155ItemBought", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "buyer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "quantity",
      "234"
    )
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ERC1155ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "returnData",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
