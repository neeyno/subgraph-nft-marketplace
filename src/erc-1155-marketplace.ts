import { Address, BigInt } from "@graphprotocol/graph-ts";
import { store } from "@graphprotocol/graph-ts";

import {
    ERC1155ItemBought as ERC1155ItemBoughtEvent,
    ERC1155ItemDelisted as ERC1155ItemDelistedEvent,
    ERC1155ItemListed as ERC1155ItemListedEvent,
    ERC1155ItemUpdated as ERC1155ItemUpdatedEvent,
} from "../generated/ERC1155Marketplace/ERC1155Marketplace";

import { ActiveItem } from "../generated/schema";

const ItemTypeERC1155 = "ERC1155";

function getIdfromERC1155EventParams(
    account: Address,
    tokenId: BigInt,
    nftContract: Address
): string {
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    return (
        account.toHexString() + tokenId.toString() + nftContract.toHexString()
    );
}

export function handleERC1155ItemListed(event: ERC1155ItemListedEvent): void {
    let itemId = getIdfromERC1155EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    // let itemId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let activeItem = ActiveItem.load(itemId);

    if (!activeItem) {
        activeItem = new ActiveItem(itemId);
    }

    activeItem.seller = event.params.seller;
    activeItem.nftContract = event.params.nftContract;
    activeItem.tokenId = event.params.tokenId;
    activeItem.price = event.params.price;
    activeItem.quantity = event.params.quantity;

    activeItem.itemType = ItemTypeERC1155;

    activeItem.blockNumber = event.block.number;
    activeItem.blockTimestamp = event.block.timestamp;
    activeItem.transactionHash = event.transaction.hash;

    activeItem.save();
}

export function handleERC1155ItemBought(event: ERC1155ItemBoughtEvent): void {
    let itemId = getIdfromERC1155EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    let activeItem = ActiveItem.load(itemId);

    if (activeItem) {
        let quantity = ((activeItem.quantity !== null
            ? activeItem.quantity
            : BigInt.fromI32(0)) as BigInt).minus(event.params.quantity);

        if (quantity < BigInt.fromI32(1)) {
            store.remove("ActiveItem", itemId);
        } else {
            activeItem.quantity = quantity;
            activeItem.save();
        }
    }
}

export function handleERC1155ItemUpdated(event: ERC1155ItemUpdatedEvent): void {
    let itemId = getIdfromERC1155EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    let activeItem = ActiveItem.load(itemId);

    if (activeItem) {
        activeItem.price = event.params.newPrice;
        activeItem.save();
    }
}

export function handleERC1155ItemDelisted(
    event: ERC1155ItemDelistedEvent
): void {
    let itemId = getIdfromERC1155EventParams(
        event.params.seller,
        event.params.tokenId,
        event.params.nftContract
    );

    // Load the ActiveItem entity from the store using the itemId
    let activeItem = ActiveItem.load(itemId);

    // Check if the activeItem exists and set its status to delisted
    if (activeItem) {
        store.remove("ActiveItem", itemId);
    }
}

/* export function handleERC1155ItemBought(event: ERC1155ItemBoughtEvent): void {
    let entity = new ERC1155ItemBought(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.buyer = event.params.buyer;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.quantity = event.params.quantity;
    entity.price = event.params.price;
    entity.returnData = event.params.returnData;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

export function handleERC1155ItemDelisted(
    event: ERC1155ItemDelistedEvent
): void {
    let entity = new ERC1155ItemDelisted(
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

export function handleERC1155ItemListed(event: ERC1155ItemListedEvent): void {
    let entity = new ERC1155ItemListed(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.seller = event.params.seller;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.quantity = event.params.quantity;
    entity.price = event.params.price;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}

export function handleERC1155ItemUpdated(event: ERC1155ItemUpdatedEvent): void {
    let entity = new ERC1155ItemUpdated(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.seller = event.params.seller;
    entity.nftContract = event.params.nftContract;
    entity.tokenId = event.params.tokenId;
    entity.newPrice = event.params.newPrice;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}
 */
