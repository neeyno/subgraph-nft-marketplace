import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ERC721ItemBought } from "../generated/schema"
import { ERC721ItemBought as ERC721ItemBoughtEvent } from "../generated/ERC721Marketplace/ERC721Marketplace"
import { handleERC721ItemBought } from "../src/erc-721-marketplace"
import { createERC721ItemBoughtEvent } from "./erc-721-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let buyer = Address.fromString("0x0000000000000000000000000000000000000001")
    let nftContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let returnData = Bytes.fromI32(1234567890)
    let newERC721ItemBoughtEvent = createERC721ItemBoughtEvent(
      buyer,
      nftContract,
      tokenId,
      price,
      returnData
    )
    handleERC721ItemBought(newERC721ItemBoughtEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ERC721ItemBought created and stored", () => {
    assert.entityCount("ERC721ItemBought", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ERC721ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "buyer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ERC721ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ERC721ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "ERC721ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ERC721ItemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "returnData",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
