import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {

  const {slug} = params

  try {

    const post = await prisma.post.update({
      where: {slug},
      include: {user: true},
      data: {
        views: { increment: 1 },
      },
    });

    console.log(post);

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
