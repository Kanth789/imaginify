import React from "react";
import Header from "../../../../../components/shared/Header";
import { transformationTypes } from "../../../../../constants";
import Transformation from "../../../../../components/shared/Transformation";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationPage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await getUserById(userId);
  return (
    <div>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <section className="mt-10">
        <Transformation
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  );
};

export default AddTransformationPage;
