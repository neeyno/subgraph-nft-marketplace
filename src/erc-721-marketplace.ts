import { Address, BigInt } from "@graphprotocol/graph-ts";

import { store } from "@graphprotocol/graph-ts";

import {
    ERC721ItemBought as ERC721ItemBoughtEvent,
    ERC721ItemDelisted as ERC721ItemDelistedEvent,
    ERC721ItemListed as ERC721ItemListedEvent,
    ERC721ItemUpdated as ERC721ItemUpdatedEvent,
} from "../generated/ERC721Marketplace/ERC721Marketplace";

import { ActiveItem } from "../generated/schema";

const ItemTypeERC721 = "ERC721";

function getIdfromERC721EventParams(
    account: Address,
    tokenId: BigInt,
    nftContract: Address
): string {
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    return (
        account.toHexString() + tokenId.toString() + nftContract.toHexString()
    );
}

export function handleERC721ItemListed(event: ERC721ItemListedEvent): void {
    let itemId = getIdfromERC721EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    // let itemId= event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let activeItem = ActiveItem.load(itemId);

    if (!activeItem) {
        activeItem = new ActiveItem(itemId);
    }

    activeItem.seller = event.params.seller;
    activeItem.nftContract = event.params.nftContract;
    activeItem.tokenId = event.params.tokenId;
    activeItem.price = event.params.price;

    activeItem.itemType = ItemTypeERC721;

    activeItem.blockNumber = event.block.number;
    activeItem.blockTimestamp = event.block.timestamp;
    activeItem.transactionHash = event.transaction.hash;

    activeItem.save();
}

export function handleERC721ItemDelisted(event: ERC721ItemDelistedEvent): void {
    let itemId = getIdfromERC721EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    // Load the ActiveItem entity from the store using the itemId
    let activeItem = ActiveItem.load(itemId);

    // Check if the activeItem exists and set its status to delisted
    // it is necessary to remove all the params of activeItem
    if (activeItem) {
        store.remove("ActiveItem", itemId);
    }
}

export function handleERC721ItemBought(event: ERC721ItemBoughtEvent): void {
    let itemId = getIdfromERC721EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    let activeItem = ActiveItem.load(itemId);
    // let soldhItem = SoldItem.load(itemId);

    if (activeItem) {
        store.remove("ActiveItem", itemId);
    }
}

export function handleERC721ItemUpdated(event: ERC721ItemUpdatedEvent): void {
    let itemId = getIdfromERC721EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    let activeItem = ActiveItem.load(itemId);

    if (activeItem) {
        activeItem.price = event.params.price;
        activeItem.save();
    }
}

/* 

export function handleERC721ItemBought(event: ERC721ItemBoughtEvent): void {
    let entity = new ERC721ItemBought(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.buyer = event.params.buyer;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.price = event.params.price;
    entity.returnData = event.params.returnData;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

export function handleERC721ItemDelisted(event: ERC721ItemDelistedEvent): void {
    let entity = new ERC721ItemDelisted(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.seller = event.params.seller;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

export function handleERC721ItemListed(event: ERC721ItemListedEvent): void {
    let entity = new ERC721ItemListed(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.seller = event.params.seller;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.price = event.params.price;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

export function handleERC721ItemUpdated(event: ERC721ItemUpdatedEvent): void {
    let entity = new ERC721ItemUpdated(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.seller = event.params.seller;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.price = event.params.price;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

*/
