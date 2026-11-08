export default function Authenticated({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}
