import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Documents } from "@/server/types"
import FileUpload from "../../../components/home/file-upload"
import Table from "@/components/documents/documents-table"
interface DocumentsTableProps {
    documents: Documents
}

const PAGINATION_LIMIT = 10;

export default function DocumentsTable({ documents }: DocumentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
            <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                    Your Documents Listed by Upload Date.
                </CardDescription>
            </div>

            <FileUpload/>
        </div>    
      </CardHeader>

      <CardContent>
        <Table documents={documents}/>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{documents.length < PAGINATION_LIMIT ? documents.length : PAGINATION_LIMIT}</strong> of <strong>{documents.length}</strong> documents
        </div>
      </CardFooter>
    </Card>
  )
}
