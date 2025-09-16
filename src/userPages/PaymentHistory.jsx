import usePaymentHistory from "../customHook/usePaymentHistory";


const PaymentHistory = () => {
    const[paymentHistory,refetch]=usePaymentHistory()
    return (
        <div className="pt-32 pb-12">
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial No</th>
        <th>TransactionId</th>
        <th>Price</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        paymentHistory.map((payment,index)=><tr key={payment?._id}>
        <th>{index+1}</th>
        <td>{payment?.transactionId}</td>
        <td>{payment?.price}</td>
        <td>{payment?.date}</td>
      </tr>)
      }
    </tbody>
  </table>
</div> 
        </div>
    );
};

export default PaymentHistory;