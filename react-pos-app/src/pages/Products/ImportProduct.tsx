import React, { useState } from 'react';
import { Upload, Download, FileText, AlertCircle } from 'lucide-react';

const ImportProduct: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.name.match(/\.(csv|xlsx|xls)$/i)) {
        alert('Please select a CSV or Excel file');
        return;
      }
      setSelectedFile(file);
      setImportResults(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      // Mock import results
      setImportResults({
        success: 15,
        errors: [
          'Row 3: Missing product name',
          'Row 7: Invalid price format',
          'Row 12: Category not found'
        ]
      });
      setImporting(false);
      setSelectedFile(null);
    }, 2000);
  };

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = `Product Name,Code,Category,Price,Description,Stock Quantity
Kinder Joy,915,Snacks,109,Premium chocolate treat,50
Ferrero Rocher,85,Snacks,1100,Italian confectionery,25
Dan Cake Brownies,76,Bakery,140,Classic brownies,30`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Import Products</h1>
        <button 
          onClick={downloadTemplate}
          className="btn-secondary flex items-center gap-2"
        >
          <Download size={20} />
          Download Template
        </button>
      </div>

      {/* Instructions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText size={20} />
          Import Instructions
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Download the CSV template and fill in your product data</p>
          <p>• Supported file formats: CSV, Excel (.xlsx, .xls)</p>
          <p>• Required fields: Product Name, Code, Category, Price</p>
          <p>• Optional fields: Description, Stock Quantity</p>
          <p>• Make sure categories exist in the system before importing</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Upload size={20} />
          Upload File
        </h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <Upload size={48} className="text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Choose a file to upload
              </p>
              <p className="text-sm text-gray-500">
                CSV, Excel files up to 10MB
              </p>
            </div>
            <button className="btn-primary">
              Select File
            </button>
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900">{selectedFile.name}</p>
                <p className="text-sm text-blue-700">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={handleImport}
                disabled={importing}
                className={`px-4 py-2 rounded-lg font-medium ${
                  importing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {importing ? 'Importing...' : 'Import Products'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Import Results */}
      {importResults && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            Import Results
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ {importResults.success} products imported successfully
              </p>
            </div>

            {importResults.errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium mb-2">
                  ❌ {importResults.errors.length} errors found:
                </p>
                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                  {importResults.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sample Data Format */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Sample Data Format</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Product Name</th>
                <th className="px-3 py-2 text-left">Code</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-left">Description</th>
                <th className="px-3 py-2 text-left">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2">Kinder Joy</td>
                <td className="px-3 py-2">915</td>
                <td className="px-3 py-2">Snacks</td>
                <td className="px-3 py-2">109</td>
                <td className="px-3 py-2">Premium chocolate treat</td>
                <td className="px-3 py-2">50</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Ferrero Rocher</td>
                <td className="px-3 py-2">85</td>
                <td className="px-3 py-2">Snacks</td>
                <td className="px-3 py-2">1100</td>
                <td className="px-3 py-2">Italian confectionery</td>
                <td className="px-3 py-2">25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImportProduct;