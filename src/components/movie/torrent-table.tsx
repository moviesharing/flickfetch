'use client';

import type { Torrent } from '@/types/yts';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Download, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateMagnetLink } from '@/lib/yts';

interface TorrentTableProps {
  torrents: Torrent[];
  movieTitle: string;
}

export default function TorrentTable({ torrents, movieTitle }: TorrentTableProps) {
  const { toast } = useToast();

  const handleCopyMagnet = (hash: string) => {
    const magnetLink = generateMagnetLink(hash, movieTitle);
    navigator.clipboard.writeText(magnetLink)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Magnet link copied successfully.",
        });
      })
      .catch(err => {
        console.error('Failed to copy magnet link: ', err);
        toast({
          title: "Error",
          description: "Failed to copy magnet link.",
          variant: "destructive",
        });
      });
  };

  if (!torrents || torrents.length === 0) {
    return <p className="text-muted-foreground">No torrents available for this movie.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quality</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-center"><TrendingUp className="inline-block mr-1 h-4 w-4" />Seeds</TableHead>
            <TableHead className="text-center"><Users className="inline-block mr-1 h-4 w-4" />Peers</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {torrents.map((torrent) => (
            <TableRow key={torrent.hash}>
              <TableCell className="font-medium">{torrent.quality}</TableCell>
              <TableCell>{torrent.type}</TableCell>
              <TableCell>{torrent.size}</TableCell>
              <TableCell className="text-center text-green-400">{torrent.seeds}</TableCell>
              <TableCell className="text-center text-blue-400">{torrent.peers}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyMagnet(torrent.hash)}
                    title="Copy Magnet Link"
                    aria-label={`Copy magnet link for ${movieTitle} ${torrent.quality}`}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Magnet
                  </Button>
                   <Button 
                    variant="outline"
                    size="sm" 
                    onClick={() => window.open(torrent.url, '_blank')}
                    title="Download .torrent file"
                    aria-label={`Download .torrent file for ${movieTitle} ${torrent.quality}`}
                   >
                     <Download className="h-4 w-4 mr-2" />
                     .torrent
                   </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
