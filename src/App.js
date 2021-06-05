import React, { useState } from "react";
import people from "./people.json";
import { BsSearch, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { Checkbox, Stack, Flex, Icon } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import useSortableData from './useSortableData'


function App() {
  const data = people;
  const [q, setQ] = useState("");
  const [searchColumn, setSearchColumn] = useState(["first_name", "last_name"]);
  // const [direction, setDirection] = useState("asc");
  // const [value, setValue] = useState("first_name");
  const { items, requestSort, sortConfig } = useSortableData(data);

  const headers = Object.keys(data[0]).splice(0, 4);

  //  Sort step 2
  const SortArrow = direction => {
    if (direction === "desc") {
      return <Icon as={BsArrowDownShort} w={5} h={5} />;
    } else if (direction === "asc") {
      return <Icon as={BsArrowUpShort} w={5} h={5} />; }
    // } else {
    //   setDirection(null);
    // }
  };

  //  Sort step 3
  // const orderedCountries = orderBy(data, direction, value);

  // const switchDirection = () => {
  //   direction === "desc" ? setDirection("asc") : setDirection("desc");
  // };

  // const setValueAndDirection = value => {
  //   switchDirection();
  //   setValue(value);
  // };

  const search = rows => {
    return rows.filter(row =>
      searchColumn.some(column => row[column].toString().toLowerCase().includes(q.toLowerCase()))
    );
  };

  const searchHandler = e => {
    const { value } = e.target;
    const inState = [...searchColumn];
    const foundItem = inState.indexOf(value);

    if (foundItem < 0) {
      inState.push(value);
    } else {
      inState.splice(foundItem, 1);
    }

    setSearchColumn(inState);
  };

  return (
    <Box w="100%">
      <Box textAlign="center" p="3" bg="gray" color="white">
        <Text fontSize="3xl" p="3">
          Data Filter & Sort
        </Text>
      </Box>
      <Box>
        <InputGroup>
          <InputLeftElement children={<Icon as={BsSearch} />} />
          <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        </InputGroup>
      </Box>
      <Flex p="3">
        <Stack spacing={10} direction="row">
          {headers.map(item => (
            <Checkbox key={uuidv4()} value={item} isChecked={searchColumn.includes(item)} onChange={searchHandler}>
              {item}
            </Checkbox>
          ))}
        </Stack>
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              {headers.map(item => (
                <Th key={uuidv4()} onClick={() => requestSort(headers.filter(el => el === item).toString()) } p="1" w="25%">
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {search(items).map(row => (
              <Tr key={uuidv4()}>
                {headers.map(column => (
                  <Td key={uuidv4()}>{row[column]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default App;
