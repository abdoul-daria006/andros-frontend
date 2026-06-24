function ProductTable({ products, onDelete, onEdit, onToggle }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4">Image</th>
            <th className="p-4">Produit</th>
            <th className="p-4">Référence</th>
            <th className="p-4">Catégorie</th>
            <th className="p-4">Statut</th>
            <th className="p-4">Fiche PDF</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={`border-b ${!product.is_active ? "opacity-50" : ""}`}>
              <td className="p-4">
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="w-20 h-20 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.reference || "—"}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}>
                  {product.is_active ? "Visible" : "Masqué"}
                </span>
              </td>
              <td className="p-4">
                {product.technical_sheet_url ? (
                  <a href={product.technical_sheet_url} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold">
                    Voir PDF
                  </a>
                ) : (
                  <span>—</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => onToggle(product.id)} className="bg-gray-700 text-white px-4 py-2 rounded">
                    {product.is_active ? "Masquer" : "Afficher"}
                  </button>
                  <button onClick={() => onEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Modifier
                  </button>
                  <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;