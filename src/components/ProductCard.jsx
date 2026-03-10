import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // If product is undefined, don't render anything (prevents white screen)
  if (!product) return null;

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imatge}
        alt={product.nom}
      />
      <CardContent>
        <Typography variant="h6">
          {product.nom}
        </Typography>
        <Typography color="text.secondary">
          {product.preu} €
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/product/${product.id}`}
          sx={{ mt: 2 }}
        >
          Veure
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;