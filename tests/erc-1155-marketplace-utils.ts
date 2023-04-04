import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ERC1155ItemBought,
  ERC1155ItemDelisted,
  ERC1155ItemListed,
  ERC1155ItemUpdated
} from "../generated/ERC1155Marketplace/ERC1155Marketplace"

export function createERC1155ItemBoughtEvent(
  buyer: Address,
  nftContract: Address,
  tokenId: BigInt,
  quantity: BigInt,
  price: BigInt,
  returnData: Bytes
): ERC1155ItemBought {
  let erc1155ItemBoughtEvent = changetype<ERC1155ItemBought>(newMockEvent())

  erc1155ItemBoughtEvent.parameters = new Array()

  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  erc1155ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("returnData", ethereum.Value.fromBytes(returnData))
  )

  return erc1155ItemBoughtEvent
}

export function createERC1155ItemDelistedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt
): ERC1155ItemDelisted {
  let erc1155ItemDelistedEvent = changetype<ERC1155ItemDelisted>(newMockEvent())

  erc1155ItemDelistedEvent.parameters = new Array()

  erc1155ItemDelistedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc1155ItemDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc1155ItemDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return erc1155ItemDelistedEvent
}

export function createERC1155ItemListedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  quantity: BigInt,
  price: BigInt
): ERC1155ItemListed {
  let erc1155ItemListedEvent = changetype<ERC1155ItemListed>(newMockEvent())

  erc1155ItemListedEvent.parameters = new Array()

  erc1155ItemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc1155ItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc1155ItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc1155ItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  erc1155ItemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return erc1155ItemListedEvent
}

export function createERC1155ItemUpdatedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  newPrice: BigInt
): ERC1155ItemUpdated {
  let erc1155ItemUpdatedEvent = changetype<ERC1155ItemUpdated>(newMockEvent())

  erc1155ItemUpdatedEvent.parameters = new Array()

  erc1155ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc1155ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc1155ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc1155ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return erc1155ItemUpdatedEvent
}
