'use client'
import { Card, Grid, Text, Row, Button } from "@nextui-org/react";

export const CardList = ({words}) => {
    const RenderCatalog = ({ item }) => {
        return (
            <div>
                <div>
                    <Text size={12} css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                        }}>{item.catalog}</Text>
                </div>
                <div>
                    <Text>- {item.value}</Text>
                </div>
            </div>
        )
    }
    return (
        <Grid.Container gap={2} justify="flex-start">
        {words.map((item, index) => (
            <Grid sm={6} md={3} key={index}>
                <Card css={{ mw: "330px" }}>
                <Card.Header>
                    <Text b>{item.title}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                    {item.value.map((word) => <RenderCatalog item={word} />)}
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row justify="flex-start">
                    <Button size="sm" light>
                        Cancel
                    </Button>
                    <Button size="sm">Edit</Button>
                    </Row>
                </Card.Footer>
                </Card>
            </Grid>
        ))}
        </Grid.Container>
    );
}
