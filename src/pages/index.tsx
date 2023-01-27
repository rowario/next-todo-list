import TodoList from "@/features/todo/TodoList";
import { AppShell, Grid, Header, Paper, Text } from "@mantine/core";

export default function Home() {
    return (
        <>
            <AppShell
                header={
                    <Header
                        height={70}
                        p="xs"
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Text weight="bold" size={24} lh={1.8}>
                            TodoList
                        </Text>
                    </Header>
                }
            >
                <Grid>
                    <Grid.Col
                        offsetLg={4}
                        lg={4}
                        xs={12}
                        offset={0}
                        offsetSm={2}
                        sm={8}
                        offsetMd={3}
                        md={6}
                    >
                        <Paper withBorder p="sm">
                            <TodoList />
                        </Paper>
                    </Grid.Col>
                </Grid>
            </AppShell>
        </>
    );
}
