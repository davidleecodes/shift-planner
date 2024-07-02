import React from "react";

const CodesPage = async ({ params: { day } }: SearchParamProps) => {
  console.log(day);
  return <div>CodesPage_{day}</div>;
};

export default CodesPage;
