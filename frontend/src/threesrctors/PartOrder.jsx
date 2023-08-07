/* eslint-disable react/prop-types */
export default function PartyOrder({ partyOrders }) {
    return (
        <div className="grid grid-cols-3">
            <p className="mx-auto col-span-1">{partyOrders.name}</p>
            <p className="mx-auto col-span-1">{partyOrders.quantity}</p>
            <p className="mx-auto col-span-1">{partyOrders.price}</p>
        </div>
    );
}

//FIX THIS ALEX!!!!!!!!!!!!!!!!!!

//Msg from ALEX-> WTF IS THIS FOR?????????????????? U are not even using this at all!!!!!
