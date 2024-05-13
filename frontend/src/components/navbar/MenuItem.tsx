'use client';

import Link from "next/link";

interface MenuItemProps {
    label: string;
    to: string;
}

const MenuItem = ({ label, to }: MenuItemProps) => {
    return (
        <Link href={to}>
            <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                {label}
            </div>
        </Link>
    );
}

export default MenuItem;
