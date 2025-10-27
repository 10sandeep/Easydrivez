import CarDetailsClient from "./CarDetailsClient";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
    return <CarDetailsClient params={params} />;
}

// ✅ Required for static export
export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
        { id: "7" },
        { id: "8" },
    ];
}
