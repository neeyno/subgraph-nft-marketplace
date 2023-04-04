import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ERC721ItemBought,
  ERC721ItemDelisted,
  ERC721ItemListed,
  ERC721ItemUpdated
} from "../generated/ERC721Marketplace/ERC721Marketplace"

export function createERC721ItemBoughtEvent(
  buyer: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt,
  returnData: Bytes
): ERC721ItemBought {
  let erc721ItemBoughtEvent = changetype<ERC721ItemBought>(newMockEvent())

  erc721ItemBoughtEvent.parameters = new Array()

  erc721ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  erc721ItemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc721ItemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc721ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  erc721ItemBoughtEvent.parameters.push(
    new ethereum.EventParam("returnData", ethereum.Value.fromBytes(returnData))
  )

  return erc721ItemBoughtEvent
}

export function createERC721ItemDelistedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt
): ERC721ItemDelisted {
  let erc721ItemDelistedEvent = changetype<ERC721ItemDelisted>(newMockEvent())

  erc721ItemDelistedEvent.parameters = new Array()

  erc721ItemDelistedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc721ItemDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc721ItemDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return erc721ItemDelistedEvent
}

export function createERC721ItemListedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt
): ERC721ItemListed {
  let erc721ItemListedEvent = changetype<ERC721ItemListed>(newMockEvent())

  erc721ItemListedEvent.parameters = new Array()

  erc721ItemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc721ItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc721ItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc721ItemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return erc721ItemListedEvent
}

export function createERC721ItemUpdatedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt
): ERC721ItemUpdated {
  let erc721ItemUpdatedEvent = changetype<ERC721ItemUpdated>(newMockEvent())

  erc721ItemUpdatedEvent.parameters = new Array()

  erc721ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc721ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  erc721ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  erc721ItemUpdatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return erc721ItemUpdatedEvent
}
