'use client'
import { Card, Grid, Text } from "@nextui-org/react";
import data from '../assets/data/final.json';

export const CardList = () => {

    return (
        <Grid.Container gap={2} justify="flex-start">
        {data.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <Grid.Container >
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                            {item.title}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>{item.catalog}</Text>
                    </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                    <Text>
                    {}
                    </Text>
                </Card.Body>
                </Card>
            </Grid>
        ))}
        </Grid.Container>
    );
}
