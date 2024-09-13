export default function calculatePaginationData({page , perPage , count}) {
  const totalPage = Math.ceil(count/perPage);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page !== 1;

  return {
    totalPage, hasNextPage, hasPrevPage
  };
}
